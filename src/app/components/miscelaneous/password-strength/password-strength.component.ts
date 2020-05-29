import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent implements OnInit, OnChanges {

  @Input() public password: string;
  @Output() passwordStrength = new EventEmitter<boolean>();

  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;

  msg: string;
  msgColor: string;

  private colorsList = ['darkred', 'orangered', 'orange', 'yellowgreen'];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {

    this.setBarColors(4, '#DDD');

    const password = changes.password.currentValue;
    if (password) {

      const pwdStrength = this.checkStrength(password);
      pwdStrength === 40 ? this.passwordStrength.emit(true) : this.passwordStrength.emit(false)

      const colorItem = this.getColor(pwdStrength);
      this.setBarColors(colorItem.index, colorItem.color);

      switch (pwdStrength) {
        case 10:
          this.msg = 'Poor';
          break;
        case 20:
          this.msg = 'Not Good';
          break;
        case 30:
          this.msg = 'Average';
          break;
        case 40:
          this.msg = 'Good';
          break;
      }
    }
    else{

      this.msg = '';
    }
  }

  checkStrength(password: string) {
    // 1: method´s retuned value
    let force = 0;

    // 2: definition of regular expressions
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(password);
    const upperLetters = /[A-Z]+/.test(password);
    const numbers = /[0-9]+/.test(password);
    const symbols = regex.test(password);

    // 3: regular expressions to be used
    const flags = [lowerLetters, upperLetters, numbers, symbols];

    // 4: check if each regular expression passed,
    // increment by 1 to passedMatches if so,
    // 0 otherwise
    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }

    // 5: check if "p" contains more than 10 characters
    //    (increment force parameter by an amount depending on "p" length)
    // increment force by the amount of passedMatches
    force += 2 * password.length + ((password.length >= 10) ? 1 : 0);
    force += passedMatches * 10;

    // 6 check if password is bigger than 6 characters
    force = (password.length <= 6) ? Math.min(force, 10) : force;

    // 7 final force value is setted according to passedMatches value
    force = (passedMatches === 1) ? Math.min(force, 10) : force;
    force = (passedMatches === 2) ? Math.min(force, 20) : force;
    force = (passedMatches === 3) ? Math.min(force, 30) : force;
    force = (passedMatches === 4) ? Math.min(force, 40) : force;

    return force;
  }

  private getColor(force: number) {
    let index = 0;
    if (force === 10) {
      index = 0;
    } else if (force === 20) {
      index = 1;
    } else if (force === 30) {
      index = 2;
    } else if (force === 40) {
      index = 3;
    } else {
      index = 4;
    }
    this.msgColor = this.colorsList[index];
    return {
      index: index + 1,
      color: this.colorsList[index]
    };
  }

  private setBarColors(count: number, color: string) {
    for (let n = 0; n < count; n++) {
      this['bar' + n] = color;
    }
  }
}
