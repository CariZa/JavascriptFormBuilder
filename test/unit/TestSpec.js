describe('Testing moo is moo, and baa is baa', function () {

  beforeEach(function() {
    var dummyElement = document.createElement('div');
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    dummyElement.appendChild = function(){};
  });


  it('Moo is moo', function() {
    expect(moo).toBe('moo');
  });

  it('Baa is baa', function() {
    expect(baa).toBe('baa');
  });
});
