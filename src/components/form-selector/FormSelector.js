import Selector from '../selector/Selector';
import Input from '../input/Input';

class FormSelector {
  constructor($root) {
    this.$root = $root;
    this.$element = this.$root;
    this.input = new Input(this.$root);
    this.selector = new Selector(this.$root);
    this.isOpen = this.selector.isOpen();
    this.bindEventListeners();
  }

  bindEventListeners() {
    $(document).on('click', this.handleDropClassActiveRemove.bind(this));
  }

  openSelector() {
    this.input.toggleActiveClass();
    this.selector.toggleActiveClass();
    this.isOpen = !this.isOpen;
  }

  closeSelector() {
    this.input.removeActiveClass();
    this.selector.removeActiveClass();
    this.isOpen = false;
  }

  handleDropClassActiveRemove(event) {
    if (this.isOpen && this.$root.find(event.target).length === 0) {
      this.closeSelector();
    }
  }

  static declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    const isTwo = number % 100 > 4 && number % 100 < 20;
    return titles[isTwo ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  }
}

export default FormSelector;
