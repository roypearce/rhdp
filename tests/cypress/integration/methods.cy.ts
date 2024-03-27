describe('Methods', () => {
  describe('setMonth', () => {
    it('should set the month properly with setMonth', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('div-month-year-title').should('have.text', 'November 2021');
      cy.realPress('Tab');
      cy.getId('btn-day-2021-11-08').should('have.focus');
      cy.getId('btn-set-month-february').click();
      cy.getId('div-month-year-title').should('have.text', 'February 2021');
      cy.getId('btn-focus-start').focus();
      cy.realPress('Tab');
      cy.getId('btn-day-2021-02-08').should('have.focus');
    });

    it('should have the same focused day as what was set in the month before changing with setMonth', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('div-month-year-title').should('have.text', 'November 2021');
      cy.getId('btn-day-2021-11-10').click().should('have.focus');
      cy.getId('btn-set-month-february').click();
      cy.getId('div-month-year-title').should('have.text', 'February 2021');
      cy.getId('btn-focus-start').focus();
      cy.realPress('Tab');
      cy.getId('btn-day-2021-02-10').should('have.focus');
    });

    it('should have the same focused day as what was set in the month before changing with setMonth unless that day of the month does not exist, in which case it should have the last day of the month focused', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('div-month-year-title').should('have.text', 'November 2021');
      cy.getId('btn-day-2021-11-30').click().should('have.focus');
      cy.getId('btn-set-month-february').click();
      cy.getId('div-month-year-title').should('have.text', 'February 2021');
      cy.getId('btn-focus-start').focus();
      cy.realPress('Tab');
      cy.getId('btn-day-2021-02-28').should('have.focus');
    });
  });

  describe('setYear', () => {
    it('should set the year properly with setYear', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('div-month-year-title').should('have.text', 'November 2021');
      cy.realPress('Tab');
      cy.getId('btn-day-2021-11-08').should('have.focus');
      cy.getId('btn-set-year-2024').click();
      cy.getId('div-month-year-title').should('have.text', 'November 2024');
      cy.getId('btn-focus-start').focus();
      cy.realPress('Tab');
      cy.getId('btn-day-2024-11-08').should('have.focus');
    });

    it('should have the same focused day as what was set in the year before changing with setYear', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('div-month-year-title').should('have.text', 'November 2021');
      cy.getId('btn-day-2021-11-10').click().should('have.focus');
      cy.getId('btn-set-year-2024').click();
      cy.getId('div-month-year-title').should('have.text', 'November 2024');
      cy.getId('btn-focus-start').focus();
      cy.realPress('Tab');
      cy.getId('btn-day-2024-11-10').should('have.focus');
    });

    it('should have the same focused day as what was set in the year before changing with setYear unless that day of the year does not exist, in which case it should have the last day of the year focused', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('div-month-year-title').should('have.text', 'November 2021');
      cy.getId('btn-day-2021-11-30').click().should('have.focus');
      cy.getId('btn-set-year-2024').click();
      cy.getId('div-month-year-title').should('have.text', 'November 2024');
      cy.getId('btn-focus-start').focus();
      cy.realPress('Tab');
      cy.getId('btn-day-2024-11-30').should('have.focus');
    });
  });

  describe('setMonth + setYear', () => {
    it('should allow month and year to be set', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('div-month-year-title').should('have.text', 'November 2021');
      cy.getId('btn-set-year-2024').click();
      cy.getId('div-month-year-title').should('have.text', 'November 2024');
      cy.getId('btn-day-2024-11-30').click().should('have.focus');
      cy.getId('btn-set-month-february').click();
      cy.getId('btn-focus-start').focus();
      cy.realPress('Tab');
      cy.getId('btn-day-2024-02-29').should('have.focus');
    });
  });

  describe('month/year button navigation after using setMonth, setYear', () => {
    it('should have next month/year buttons function as expected', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('div-month-year-title').should('have.text', 'November 2021');
      cy.getId('btn-day-2021-11-30').click().should('have.focus');
      cy.getId('btn-set-month-february').click();
      cy.getId('btn-set-year-2024').click();
      cy.getId('div-month-year-title').should('have.text', 'February 2024');
      cy.getId('btn-next-year').click();
      cy.getId('div-month-year-title').should('have.text', 'February 2025');
      cy.getId('btn-next-month').click();
      cy.getId('div-month-year-title').should('have.text', 'March 2025');
    });
  });
});
