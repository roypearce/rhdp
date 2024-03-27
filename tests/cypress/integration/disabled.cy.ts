describe('Disabed controls', () => {
  describe('Disabled previous year button', () => {
    it('should be disabled when minDate is within one year', () => {
      cy.visitStory('tests--min-date');
      cy.getId('btn-previous-year').should('be.disabled');
      cy.getId('btn-set-min-date-2019-08-08').click();
      cy.getId('btn-previous-year')
        .should('not.be.disabled')
        .realClick()
        .should('not.be.disabled')
        .realClick()
        .should('be.disabled');
    });
  });

  describe('Disabled previous month button', () => {
    it('should be disabled when minDate is within one month', () => {
      cy.visitStory('tests--min-date');
      cy.getId('btn-previous-month').should('be.disabled');
      cy.getId('btn-set-min-date-2021-08-08').click();
      cy.getId('btn-previous-month')
        .should('not.be.disabled')
        .realClick()
        .should('not.be.disabled')
        .realClick()
        .should('not.be.disabled')
        .realClick()
        .should('be.disabled');
    });

    it('should have no effect if it is not disabled when minDate is within one month', () => {
      cy.visitStory('tests--broken-min-max-date');
      cy.getId('btn-previous-month').should('not.be.disabled');
      cy.getId('div-month-year-title').should('contain', 'November 2021');
      cy.getId('btn-previous-month').click();
      cy.getId('div-month-year-title').should('contain', 'November 2021');
    });
  });

  describe('Disabled next month button', () => {
    it('should be disabled when maxDate is within one month', () => {
      cy.visitStory('tests--max-date');
      cy.getId('btn-next-month').should('be.disabled');
      cy.getId('btn-set-max-date-2022-01-08').click();
      cy.getId('btn-next-month')
        .should('not.be.disabled')
        .realClick()
        .should('not.be.disabled')
        .realClick()
        .should('be.disabled');
    });

    it('should have no effect if it is not disabled when minDate is within one month', () => {
      cy.visitStory('tests--broken-min-max-date');
      cy.getId('btn-next-month').should('not.be.disabled');
      cy.getId('div-month-year-title').should('contain', 'November 2021');
      cy.getId('btn-next-month').click();
      cy.getId('div-month-year-title').should('contain', 'November 2021');
    });
  });

  describe('Disabled next year button', () => {
    it('should be disabled when maxDate is within one year', () => {
      cy.visitStory('tests--max-date');
      cy.getId('btn-next-year').should('be.disabled');
      cy.getId('btn-set-max-date-2024-01-08').click();
      cy.getId('btn-next-year')
        .should('not.be.disabled')
        .realClick()
        .should('not.be.disabled')
        .realClick()
        .should('be.disabled');
    });
  });
});

describe('Disabed dates', () => {
  describe('Disabled with minDate', () => {
    it('should disable all dates before the specified minDate', () => {
      cy.visitStory('tests--min-date');
      cy.getId('btn-day-2021-10-31').should('be.disabled');
      cy.getId('btn-day-2021-11-01').should('be.disabled');
      cy.getId('btn-day-2021-11-02').should('be.disabled');
      cy.getId('btn-day-2021-11-03').should('be.disabled');
      cy.getId('btn-day-2021-11-04').should('be.disabled');
      cy.getId('btn-day-2021-11-05').should('be.disabled');
      cy.getId('btn-day-2021-11-06').should('be.disabled');

      // should not disable all dates on and after the specified minDate
      cy.getId('btn-day-2021-11-07').should('not.be.disabled');
      cy.getId('btn-day-2021-11-08').should('not.be.disabled');
      cy.getId('btn-day-2021-11-09').should('not.be.disabled');
      cy.getId('btn-day-2021-11-10').should('not.be.disabled');
      cy.getId('btn-day-2021-11-11').should('not.be.disabled');
      cy.getId('btn-day-2021-11-12').should('not.be.disabled');
      cy.getId('btn-day-2021-11-13').should('not.be.disabled');
      cy.getId('btn-day-2021-11-14').should('not.be.disabled');
      cy.getId('btn-day-2021-11-15').should('not.be.disabled');
      cy.getId('btn-day-2021-11-16').should('not.be.disabled');
      cy.getId('btn-day-2021-11-17').should('not.be.disabled');
      cy.getId('btn-day-2021-11-18').should('not.be.disabled');
      cy.getId('btn-day-2021-11-19').should('not.be.disabled');
      cy.getId('btn-day-2021-11-20').should('not.be.disabled');
      cy.getId('btn-day-2021-11-21').should('not.be.disabled');
      cy.getId('btn-day-2021-11-22').should('not.be.disabled');
      cy.getId('btn-day-2021-11-23').should('not.be.disabled');
      cy.getId('btn-day-2021-11-24').should('not.be.disabled');
      cy.getId('btn-day-2021-11-25').should('not.be.disabled');
      cy.getId('btn-day-2021-11-26').should('not.be.disabled');
      cy.getId('btn-day-2021-11-27').should('not.be.disabled');
      cy.getId('btn-day-2021-11-28').should('not.be.disabled');
      cy.getId('btn-day-2021-11-29').should('not.be.disabled');
      cy.getId('btn-day-2021-11-30').should('not.be.disabled');
      cy.getId('btn-day-2021-12-01').should('not.be.disabled');
      cy.getId('btn-day-2021-12-02').should('not.be.disabled');
      cy.getId('btn-day-2021-12-03').should('not.be.disabled');
      cy.getId('btn-day-2021-12-04').should('not.be.disabled');
    });

    it('should not allow disabled dates to be selected with minDate set', () => {
      cy.visitStory('tests--min-date');
      cy.getId('btn-day-2021-11-06').realClick();
      cy.getId('btn-day-2021-11-06').should('have.attr', 'aria-pressed', 'false');
      cy.getId('div-dates-selected').should('have.text', '2021-11-08');
    });
  });

  describe('Disabled with maxDate', () => {
    it('should disable all dates after the specified maxDate', () => {
      cy.visitStory('tests--max-date');
      cy.getId('btn-day-2021-11-29').should('be.disabled');
      cy.getId('btn-day-2021-11-30').should('be.disabled');
      cy.getId('btn-day-2021-12-01').should('be.disabled');
      cy.getId('btn-day-2021-12-02').should('be.disabled');
      cy.getId('btn-day-2021-12-03').should('be.disabled');
      cy.getId('btn-day-2021-12-04').should('be.disabled');
    });

    it('should not disable all dates on and before the specified maxDate', () => {
      cy.visitStory('tests--max-date');
      cy.getId('btn-day-2021-10-31').should('not.be.disabled');
      cy.getId('btn-day-2021-11-01').should('not.be.disabled');
      cy.getId('btn-day-2021-11-02').should('not.be.disabled');
      cy.getId('btn-day-2021-11-03').should('not.be.disabled');
      cy.getId('btn-day-2021-11-04').should('not.be.disabled');
      cy.getId('btn-day-2021-11-05').should('not.be.disabled');
      cy.getId('btn-day-2021-11-06').should('not.be.disabled');
      cy.getId('btn-day-2021-11-07').should('not.be.disabled');
      cy.getId('btn-day-2021-11-08').should('not.be.disabled');
      cy.getId('btn-day-2021-11-09').should('not.be.disabled');
      cy.getId('btn-day-2021-11-10').should('not.be.disabled');
      cy.getId('btn-day-2021-11-11').should('not.be.disabled');
      cy.getId('btn-day-2021-11-12').should('not.be.disabled');
      cy.getId('btn-day-2021-11-13').should('not.be.disabled');
      cy.getId('btn-day-2021-11-14').should('not.be.disabled');
      cy.getId('btn-day-2021-11-15').should('not.be.disabled');
      cy.getId('btn-day-2021-11-16').should('not.be.disabled');
      cy.getId('btn-day-2021-11-17').should('not.be.disabled');
      cy.getId('btn-day-2021-11-18').should('not.be.disabled');
      cy.getId('btn-day-2021-11-19').should('not.be.disabled');
      cy.getId('btn-day-2021-11-20').should('not.be.disabled');
      cy.getId('btn-day-2021-11-21').should('not.be.disabled');
      cy.getId('btn-day-2021-11-22').should('not.be.disabled');
      cy.getId('btn-day-2021-11-23').should('not.be.disabled');
      cy.getId('btn-day-2021-11-24').should('not.be.disabled');
      cy.getId('btn-day-2021-11-25').should('not.be.disabled');
      cy.getId('btn-day-2021-11-26').should('not.be.disabled');
      cy.getId('btn-day-2021-11-27').should('not.be.disabled');
      cy.getId('btn-day-2021-11-28').should('not.be.disabled');
    });
  });

  it('should not allow disabled dates to be selected with maxDate set', () => {
    cy.visitStory('tests--max-date');
    cy.getId('btn-day-2021-11-29').realClick();
    cy.getId('btn-day-2021-11-29').should('have.attr', 'aria-pressed', 'false');
    cy.getId('div-dates-selected').should('have.text', '2021-11-08');
  });

  describe('Disabled with minDate and maxDate', () => {
    it('should disable all dates before the specified minDate and after the specified maxDate', () => {
      cy.visitStory('tests--min-max-date');
      cy.getId('btn-day-2021-10-31').should('be.disabled');
      cy.getId('btn-day-2021-11-01').should('be.disabled');
      cy.getId('btn-day-2021-11-02').should('be.disabled');
      cy.getId('btn-day-2021-11-03').should('be.disabled');
      cy.getId('btn-day-2021-11-04').should('be.disabled');
      cy.getId('btn-day-2021-11-05').should('be.disabled');
      cy.getId('btn-day-2021-11-06').should('be.disabled');
      cy.getId('btn-day-2021-11-29').should('be.disabled');
      cy.getId('btn-day-2021-11-30').should('be.disabled');
      cy.getId('btn-day-2021-12-01').should('be.disabled');
      cy.getId('btn-day-2021-12-02').should('be.disabled');
      cy.getId('btn-day-2021-12-03').should('be.disabled');
      cy.getId('btn-day-2021-12-04').should('be.disabled');
    });

    it('should not disable all dates between and on the specified minDate and maxDate', () => {
      cy.visitStory('tests--min-max-date');
      cy.getId('btn-day-2021-11-07').should('not.be.disabled');
      cy.getId('btn-day-2021-11-08').should('not.be.disabled');
      cy.getId('btn-day-2021-11-09').should('not.be.disabled');
      cy.getId('btn-day-2021-11-10').should('not.be.disabled');
      cy.getId('btn-day-2021-11-11').should('not.be.disabled');
      cy.getId('btn-day-2021-11-12').should('not.be.disabled');
      cy.getId('btn-day-2021-11-13').should('not.be.disabled');
      cy.getId('btn-day-2021-11-14').should('not.be.disabled');
      cy.getId('btn-day-2021-11-15').should('not.be.disabled');
      cy.getId('btn-day-2021-11-16').should('not.be.disabled');
      cy.getId('btn-day-2021-11-17').should('not.be.disabled');
      cy.getId('btn-day-2021-11-18').should('not.be.disabled');
      cy.getId('btn-day-2021-11-19').should('not.be.disabled');
      cy.getId('btn-day-2021-11-20').should('not.be.disabled');
      cy.getId('btn-day-2021-11-21').should('not.be.disabled');
      cy.getId('btn-day-2021-11-22').should('not.be.disabled');
      cy.getId('btn-day-2021-11-23').should('not.be.disabled');
      cy.getId('btn-day-2021-11-24').should('not.be.disabled');
      cy.getId('btn-day-2021-11-25').should('not.be.disabled');
      cy.getId('btn-day-2021-11-26').should('not.be.disabled');
      cy.getId('btn-day-2021-11-27').should('not.be.disabled');
      cy.getId('btn-day-2021-11-28').should('not.be.disabled');

      // should not allow disabled dates to be selected with minDate and maxDate set
      cy.getId('btn-day-2021-11-06').realClick();
      cy.getId('btn-day-2021-11-06').should('have.attr', 'aria-pressed', 'false');
      cy.getId('div-dates-selected').should('have.text', '2021-11-08');
      cy.getId('btn-day-2021-11-29').realClick();
      cy.getId('btn-day-2021-11-29').should('have.attr', 'aria-pressed', 'false');
      cy.getId('div-dates-selected').should('have.text', '2021-11-08');
    });
  });
});
