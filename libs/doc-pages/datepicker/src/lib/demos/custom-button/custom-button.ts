import { Component, ViewChild } from '@angular/core';
import { BsDatepickerConfig, BsDatepickerDirective, BsDaterangepickerConfig, BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
interface IRange {
  value: Date[];
  label: string;
}
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-datepicker-custom-button',
  templateUrl: './custom-button.html',
  standalone: false
})
export class DemoDatepickerCustomButtonComponent {
    private states = [ 'disabled', 'left', 'center', 'right' ];
    private ranges: IRange[] = [{
      value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
      label: 'Last 7 Days'
    }, {
      value: [new Date(), new Date(new Date().setDate(new Date().getDate() + 7))],
      label: 'Next 7 Days'
    }];
    @ViewChild('dp', { static: false }) datepicker?: BsDatepickerDirective;
    @ViewChild('dpr', { static: false }) dateRangepicker?: BsDaterangepickerDirective;
    private defaultConfig: Partial<BsDatepickerConfig> = { closeOnSelect: false, containerClass: 'theme-dark-blue' };
    private defaultRangeConfig: Partial<BsDatepickerConfig> = { ranges: this.ranges, closeOnSelect: false, containerClass: 'theme-green' };
    public config: Partial<BsDatepickerConfig> = { closeOnSelect: false, containerClass: 'theme-dark-blue' };
    public rangeConfig: Partial<BsDaterangepickerConfig> = { ranges: this.ranges, closeOnSelect: false, containerClass: 'theme-green' };
    public previousValue?: Date;
    public bsValue?: Date = new Date();
    public previousRangeValue?: Date[];
    public bsRangeValue: Date[] | undefined;
    private _todayState = 0;
    private getText(index: number, button: string) : string {
      return `${button}: ${this.states[index]}`
    }
    public get todayState(): string {
      return this.getText(this._todayState, 'Today');
    }
    private _todayStateRange = 0;
    public get todayStateRange(): string {
      return this.getText(this._todayStateRange, 'Today');
    }

    private _clearState = 0;
    public get clearState(): string {
      return this.getText(this._clearState, 'Clear');
    }
    private _clearStateRange = 0;
    public get clearStateRange(): string {
      return this.getText(this._clearStateRange, 'Clear');
    }

    private _applyAndCancelState = false;
    public get applyAndCancelState(): string {
      return this._applyAndCancelState ? 'Custom buttons: enabled' : 'Custom buttons: disabled';
    }

    private _applyAndCancelStateRange = false;
    public get applyAndCancelStateRange(): string {
      return this._applyAndCancelStateRange ? 'Custom buttons: enabled' : 'Custom buttons: disabled';
    }

    public withToday(range?: 'range'): void {
      if (range) {
        this._todayStateRange++;
        this._todayStateRange = this._todayStateRange % 4;
        this.generateRangeConfig();
        return;
      }
      this._todayState++;
      this._todayState = this._todayState % 4;
      this.generateConfig();
    }

    public withClear(range?: 'range'): void {
      if (range) {
        this._clearStateRange++;
        this._clearStateRange = this._clearStateRange % 4;
        this.generateRangeConfig();
        return;
      }
      this._clearState++;
      this._clearState = this._clearState % 4;
      this.generateConfig();
    }

    public withApplyAndCancel(range?: 'range'): void {
      if (range) {
        this._applyAndCancelStateRange = !this._applyAndCancelStateRange;
        this.generateRangeConfig();
        return;
      }
      this._applyAndCancelState = !this._applyAndCancelState;
      this.generateConfig();
    }
    public get hasDateChanged(): boolean {
      return this.previousValue != this.bsValue;
    }

    public get hasDateRangeChanged(): boolean {
      return this.previousRangeValue != this.bsRangeValue;
    }
    private generateConfig(): void {
      const styles = this.getStyles(this._todayState, this._clearState);
      this.config = {
        ...this.defaultConfig,
        showTodayButton: this._todayState > 0,
        todayPosition: this.states[this._todayState],
        showClearButton: this._clearState > 0,
        clearPosition: this.states[this._clearState],
        customButtons: this._applyAndCancelState ? [
          { label: 'Apply', btnClass: 'btn-primary', containerClass: styles.apply, action: (date) => this.applyDate(date) },
          { label: 'Cancel', btnClass: 'btn-secondary', containerClass: styles.cancel, action: (date) => this.cancelDate(date) },
        ] :[]
      }
      setTimeout(() => {
        const wasOpen = this.datepicker?.isOpen;
        this.datepicker?.hide();
        if(wasOpen) {
          this.datepicker?.show();
        }
      },10);
    }
    private getStyles(today: number, clear: number): {apply: string, cancel: string} {
      const everythingDisabled = today == 0 && clear == 0;
      const bothLeft = (today == 1 || today == 0) && (clear == 1 || clear == 0);
      const anythingRight = today == 3 || clear == 3;
      const bothRight = (today == 3 || today == 0) && (clear == 3 || clear == 0);
      let applyStyle = !bothRight ? 'me-2' : 'me-1';
      let cancelStyle = 'ms-1';
      if (everythingDisabled || bothLeft) {
        applyStyle = 'ms-auto me-1';
      }
      if (anythingRight) {
        cancelStyle = 'ms-1 me-2';
      }
      return {apply: applyStyle, cancel: cancelStyle}
    }
    private generateRangeConfig(): void {
      const styles = this.getStyles(this._todayStateRange, this._clearStateRange);
      this.rangeConfig = {
        ...this.defaultRangeConfig,
        showTodayButton: this._todayStateRange > 0,
        todayPosition: this.states[this._todayStateRange],
        showClearButton: this._clearStateRange > 0,
        clearPosition: this.states[this._clearStateRange],
        customButtons: this._applyAndCancelStateRange ? [
          { label: 'Apply', btnClass: 'btn-primary', containerClass: styles.apply, action: (date) => this.applyDateRange(date) },
          { label: 'Cancel', btnClass: 'btn-secondary', containerClass: styles.cancel, action: (date) => this.cancelDateRange(date) },
        ] :[]
      }
      setTimeout(() => {
        const wasOpen = this.dateRangepicker?.isOpen;
        this.dateRangepicker?.hide();
        if(wasOpen) {
          this.dateRangepicker?.show();
        }
      },10);
    }

    private applyDate(value: Date | undefined): void {
      this.previousValue = value;
      this.datepicker?.hide();
    }

    private cancelDate(_value: Date | undefined): void {
      this.bsValue = this.previousValue;
      this.datepicker?.hide();
    }

    private applyDateRange(value: Date[] | undefined): void {
      this.previousRangeValue = value;
      this.dateRangepicker?.hide();
    }

    private cancelDateRange(_value: Date[] | undefined): void {
      this.bsRangeValue = this.previousRangeValue;
      this.dateRangepicker?.hide();
    }

}
