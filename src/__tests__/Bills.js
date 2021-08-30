import { screen } from '@testing-library/dom';
import { bills } from '../fixtures/bills.js';
import BillsUI from '../views/BillsUI.js';

describe('Given I am connected as an employee', () => {
  describe('When I am on Bills Page and there are no bill', () => {
    test('Then bills should render an empty table', () => {
      const html = BillsUI({ data: [] });
      document.body.innerHTML = html;
      // to-do write expect expression
      // DONE :
      const table = screen.queryByTestId('table');
      expect(table.innerHTML).toBe('');
    });
  });

  // test loading page sur BillUI
  test('Then, Loading page should be rendered', () => {
    // BillUI.loading, condition qui retourne la loading page si TRUE
    const html = BillsUI({ loading: true });
    document.body.innerHTML = html;
    // Attend une valeur retour du DOM, verifie que le contenu est TRUE
    expect(screen.getAllByText('Loading...')).toBeTruthy();
  });

  describe('When I am on Bills Page and there are bill(s)', () => {
    test('Then bills should be ordered from earliest to latest', () => {
      const frenchMonths = [];
      for (let i = 0; i < 12; i++) {
        frenchMonths.push(
          new Intl.DateTimeFormat('fr', { month: 'short' }).format(
            new Date(2000, i)
          )
        );
      }

      // reverse Us date (year, month, day) into Fr date (day, month, year)
      const formatDateReverse = (formatedDate) => {
        let [day, month, year] = formatedDate.split(' ');
        day = parseInt(day);
        month = frenchMonths.findIndex(
          (element) => element === month.toLowerCase()
        );
        year =
          parseInt(year) < 70 ? 2000 + parseInt(year) : 1900 + parseInt(year); //arbitrary range for year : 1970-2069
        return new Date(year, month, day);
      };

      document.body.innerHTML = BillsUI({ data: billsSample });
      const dates = Array.from(
        document.body.querySelectorAll('#data-table tbody>tr>td:nth-child(3)')
      ).map((a) => a.innerHTML);
      const antiChronoSort = (a, b) =>
        formatDateReverse(a) < formatDateReverse(b) ? 1 : -1;
      const datesSorted = [...dates].sort(antiChronoSort);
      expect(dates).toEqual(datesSorted);
    });
  });

  /* ORIGINAL ----------------------------------------------------------------------------------------------------------------
      const dates = screen
        .getAllByText(
          /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i
        )
        .map((a) => a.innerHTML);

      // recupere les dates
      expect(dates).toEqual([...dates].sort((a, b) => (a < b ? 1 : -1)));
    });
  });*/
});

// describe('When I am on Bills page and back-end send an error message', () => {
//   test('Then, Error page should be rendered', () => {
//     document.body.innerHTML = BillsUI({ error: 'some error message' });
//     expect(screen.getAllByText('Erreur')).toBeTruthy();
//   });
// });

// describe('When I am on Bills page and I click on the iconEye of one of the bills', () => {
//   test('Then, the open modal handler should be run', () => {
//     document.body.innerHTML = BillsUI({ data: bills });
//     const sampleBills = new Bills({
//       document,
//       onNavigate,
//       firestore: null,
//       localStorage: window.localStorage,
//     });
//     sampleBills.handleClickIconEye = jest.fn();
//     screen.getAllByTestId('icon-eye')[0].click();
//     expect(sampleBills.handleClickIconEye).toBeCalled();
//   });

//   test("Then, the modal should display the attached image", () => {
//     document.body.innerHTML = BillsUI({ data: bills })
//     const sampleBills = new Bills({ document, onNavigate, firestore: null, localStorage: window.localStorage })
//     const iconEye = document.querySelector(`div[data-testid="icon-eye"]`)
//     $.fn.modal = jest.fn()
//     sampleBills.handleClickIconEye(iconEye)
//     expect($.fn.modal).toBeCalled()
//     expect(document.querySelector(".modal")).toBeTruthy()
//   })
// });
