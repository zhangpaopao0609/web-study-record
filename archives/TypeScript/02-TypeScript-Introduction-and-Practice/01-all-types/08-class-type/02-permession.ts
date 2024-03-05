class Base {
  public a: string = '';
  protected b: string = '';
  private c: string = '';
  #d: string = '';
  
  private a2() {
    return this.#d;
  }
}

class Derived extends Base {
  public a1() {
    console.log(this.b);
    return this.a;
  }
};

const derived = new Derived();

derived.a;
derived.a1();