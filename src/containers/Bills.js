import { ROUTES_PATH } from '../constants/routes.js';
import { formatDate, formatStatus } from '../app/format.js';
import Logout from './Logout.js';

export default class {
  constructor({ document, onNavigate, firestore, localStorage }) {
    this.document = document;
    this.onNavigate = onNavigate;
    this.firestore = firestore;

    const buttonNewBill = document.querySelector(
      `button[data-testid="btn-new-bill"]`
    );

    // // no need to cover this function by tests
    // /* istanbul ignore next*/
    if (buttonNewBill)
      buttonNewBill.addEventListener('click', this.handleClickNewBill);

    const iconEye = document.querySelectorAll(`div[data-testid="icon-eye"]`);
    // condition toujours vraie
    // if (iconEye)
    // fix : si la liste des nouvelles notes de frais n'est pas vide, alors...
    if (iconEye.length !== 0)
      iconEye.forEach((icon) => {
        icon.addEventListener('click', (e) => this.handleClickIconEye(icon));
      });
    new Logout({ document, localStorage, onNavigate });
  }

  handleClickNewBill = (e) => {
    this.onNavigate(ROUTES_PATH['NewBill']);
  };

  handleClickIconEye = (icon) => {
    const billUrl = icon.getAttribute('data-bill-url');
    $('#modaleFile')
      .find('.modal-body')
      .html(
        `<div style='text-align: center;'><img src=${billUrl} /></div>`
      );

    // // no need to cover this function by tests
    // /* istanbul ignore next*/
    if (typeof $('#modaleFile').modal === 'function')
      $('#modaleFile').modal('show');
  };

  // no need to cover this function by tests
  /* istanbul ignore next*/
  getBills = () => {
    const userEmail = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).email
      : '';
    if (this.firestore) {
      return this.firestore
        .bills()
        .get()
        .then((snapshot) => {
          const bills = snapshot.docs
            .map((doc) => ({
              ...doc.data(),
              // date: formatDate(doc.data().date),
              // status: formatStatus(doc.data().status),
            }))
            .filter((bill) => bill.email === userEmail);
          console.log('length', bills.length);
          return bills;
        })
        // .catch((error) => error);
        .catch((error) => Promise.reject(Error(error)));
    }
  };
}
