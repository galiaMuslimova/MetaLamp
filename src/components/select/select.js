function takeItemsCount(selectForm) {
  const $items = selectForm.find('.js-count__num');
  const values = $items.map((x) => $($items[x]).val());
  return ([Number(values[0]), Number(values[1]), Number(values[2])]);
}

function showHideResetButton(selectForm) {
  const result = takeItemsCount(selectForm).reduce((sum, elem) => sum + elem, 0);
  const $reset = selectForm.find('.js-select__reset-btn');
  if (result > 0) {
    $reset.addClass('select__reset-btn_active');
  } else {
    $reset.removeClass('select__reset-btn_active');
  }
}

function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  const isTwo = number % 100 > 4 && number % 100 < 20;
  return titles[isTwo ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function createGuestsText(selectForm) {
  const numOfGuests = takeItemsCount(selectForm);
  const adultsNum = numOfGuests[0] + numOfGuests[1];
  const adults = `${adultsNum} ${declOfNum(adultsNum, ['гость', 'гостя', 'гостей'])}`;
  const babies = `${numOfGuests[2]} ${declOfNum(numOfGuests[2], ['младенец', 'младенца', 'младенцев'])}`;
  let str;
  if (adultsNum === 0) {
    str = 'Сколько гостей';
  } else
    if (numOfGuests[2] === 0) {
      str = adults;
    } else {
      str = `${adults}, ${babies}`;
    }
  return str;
}

function createPlacementText(selectForm) {
  const numOfplacement = takeItemsCount(selectForm);
  const bedrooms = `${numOfplacement[0]} ${declOfNum(numOfplacement[0], ['спальня', 'спальни', 'спален'])}`;
  const beds = `${numOfplacement[1]} ${declOfNum(numOfplacement[1], ['кровать', 'кровати', 'кроватей'])}`;
  let str;
  if (numOfplacement[0] === 0) {
    str = 'Сколько спален';
  } else {
    str = `${bedrooms}, ${beds}...`;
  }
  return str;
}

$(() => {
  const $select = $('.js-select');
  $select.each(function () {
    const $selectForm = $(this).closest('form');    
    const $input = $selectForm.find('.js-input__field'); 
    const $drop = $selectForm.find('.js-drop');   
    if ($drop.hasClass('drop_for-guests')) {
      const str = createGuestsText($selectForm);
      $input.val(str);
      showHideResetButton($selectForm);
    }
    if ($drop.hasClass('drop_for-placement')) {
      const str = createPlacementText($selectForm);
      $input.val(str);
    }
  })

  $('.js-select__reset-btn').on('click', function () {
    const $selectForm = $(this).closest('form');
    const $countNums = $selectForm.find('.js-count__num');
    const $minus = $selectForm.find('.js-count__btn_with-minus');
    $countNums.each(function () {
      $(this).val(0);
    });
    $minus.each(function () {
      $(this).addClass('count__btn_disabled');
    });
    showHideResetButton($selectForm);
  });

  $('.js-select__submit-btn').on('click', function () {
    const $selectForm = $(this).closest('form');
    const $drop = $selectForm.find('.js-drop');
    $drop.removeClass('drop_active');
  });
});

export {
  createPlacementText, 
  createGuestsText, 
  showHideResetButton
}

