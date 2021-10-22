import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

$(window).on('load', function () {
  let calendar = new AirDatepicker('#calendar', {
    navTitles: {
      days: '<strong>MMMM </strong> <strong> yyyy</strong>'
    },
    multipleDates: true,      
    range: true,
    dynamicRange: true,
    autoClose: true,
    onSelect: function (res) {
      sessionStorage.setItem('date-start', res.formattedDate[0]);
      sessionStorage.setItem('date-end', res.formattedDate[1]);
    },
    buttons: "clear",
  }); 
})
  
