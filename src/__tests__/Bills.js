import { screen } from '@testing-library/dom';
import { bills } from '../fixtures/bills.js';
import { ROUTES } from '../constants/routes';
import { localStorageMock } from '../__mocks__/localStorage';
import BillsUI from '../views/BillsUI.js';
import Bills from '../containers/Bills';
import userEvent from '@testing-library/user-event';

describe('Given I am connected as an employee', () => {
  describe('When I am on Bills Page and there are no bill', () => {
    test('Then bills should be empty', () => {
      const html = BillsUI({ data: [] });
      document.body.innerHTML = html;
      //to-do write expect expression // DONE
      const eyeIconElt = screen.queryByTestId('icon-eye');
      expect(eyeIconElt).toBeNull();
    });
  });

  describe('When I am on Bills Page and there are bill(s)', () => {
    test('Then bills should be ordered from earliest to latest', () => {
      const html = BillsUI({ data: bills });
      document.body.innerHTML = html;
      // TestingLibraryElementError: Unable to find an element with the text:
      // /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/i.
      // This could bebecause the text is broken up by multiple elements.
      // In this case, you can provide a function for your text matcher to make your matcher more flexible
      // TESTS -------------------------------------------------------------------------------------------
      // const dates = screen.getAllByText("21.02.21").map(a => a.innerHTML)
      // const dates = screen.getAllByText(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/i).map(a => a.innerHTML)

      // // ORIGINAL ----------------------------------------------------------------------------------------------------------------
      // const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)

      // recupere les dates
      const dates = Array.from(
        document.body.querySelectorAll('#data-table tbody>tr>td:nth-child(3)')
      ).map((a) => a.innerHTML);

      console.log(dates);

      const antiChrono = (a, b) => (a < b ? 1 : -1);
      const datesSorted = [...dates].sort(antiChrono);
      console.log(datesSorted);

      expect(dates).toEqual(datesSorted);
      // screen.debug();
    });
  });
});
