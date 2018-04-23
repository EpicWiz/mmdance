
  let EBAPI;

  let ebCall = () => {

    $.ajax({
      type: "GET",
      url: "./ebAPI.php",
      success: function(text){
      EBAPI = $.parseJSON(text);
      EBAPI.events.reverse();
      showAPI();
      }
    });
  };

  let showAPI = () => {
    let colCount = 1; //column counter for new rows

    let nRow = $('<div>'); //new row
    nRow.addClass('row');

    for (i = 0; i <= EBAPI.events.length; i++) {
      let events = $('#events');

      if (colCount === 4) {
        //next row
        events.append(nRow);
        nRow = '';
        nRow = $('<div>');
        nRow.addClass('row');
        colCount = 2;
      } else if (i === EBAPI.events.length) {
        events.append(nRow);
        break;
      } else {
        //no new row
        colCount ++;
      }

      //new column
      let nCol = $('<div>');
      nCol.addClass('col-md-4');

      //new card
      let nCard = $('<div>');
      nCard.addClass('card');

      //new card image
      let nCImg = $('<img>');
      nCImg.addClass('card-img-top');
      nCImg.attr('src', EBAPI.events[i].logo.url);

      nCard.append(nCImg);

      //new card body
      let cBody = $('<div>');
      cBody.addClass('card-body');

      //new card button
      let cButton = $('<a>');
      cButton.attr('href', EBAPI.events[i].url);
      cButton.append('VIEW');
      cButton.addClass('btn btn-light vMx');

      cBody.append(cButton);

      //Edit Date
      let sDate = EBAPI.events[i].start.utc;
      let fYear, fMonth, fDay, fdPost;
      let fDate = '';

      fYear = sDate.substring(0, 4);
      fMonth = sDate.substring(5, 7);
      fDay = sDate.substring(8, 10);

      switch (fMonth) {
        case '01':
          fMonth = 'JANUARY';
          break;
        case '02':
          fMonth = 'FEBRUARY';
          break;
        case '03':
          fMonth = 'MARCH';
          break;
        case '04':
          fMonth = 'APRIL';
          break;
        case '05':
          fMonth = 'MAY';
          break;
        case '06':
          fMonth = 'JUNE';
          break;
        case '07':
          fMonth = 'JULY';
          break;
        case '08':
          fMonth = 'AUGUST';
          break;
        case '09':
          fMonth = 'SEPTEMBER';
          break;
        case '10':
          fMonth = 'OCTOBER';
          break;
        case '11':
          fMonth = 'NOVEMBER';
          break;
        case '12':
          fMonth = 'DECEMBER';
          break;
        default:
          fMonth = 'NONE';
      }

      switch (fDay.substring(1)) {
        case '1':
          fDay += '<sup>st</sup>,';
          break;
        case '2':
          fDay += '<sup>nd</sup>,';
          break;
        case '3':
          fDay += '<sup>rd</sup>,';
          break;
        default:
          fDay += '<sup>th</sup>,';
      }

      fDate = fMonth + ' ' + fDay + ' ' + fYear
      //new card date
      let cDate = $('<span>');
      cDate.addClass('cDate');
      cDate.append(fDate);

      cBody.append(cDate);

      //new card title
      let cTitle = $('<div>');
      cTitle.addClass('card-title');
      cTitle.append(EBAPI.events[i].name.text.toUpperCase());

      cBody.append(cTitle);

      //new card location
      let cLocation = $('<div>');
      cLocation.addClass('card-text');
      cLocation.append(EBAPI.events[i].end.timezone.toUpperCase());

      cBody.append(cLocation);

      nCard.append(cBody);

      nCol.append(nCard);

      nRow.append(nCol);

    }

  };
