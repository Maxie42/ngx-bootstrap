import { Component, ViewChild } from '@angular/core';
import { BsDatepickerConfig, BsDatepickerDirective, BsDaterangepickerConfig, BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { DatepickerButtonPosition } from 'src/datepicker/models';
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

    private _applyState = 0;
    public get applyState(): string {
      return this.getText(this._applyState, 'Custom Apply');
    }

    private _applyStateRange = 0;
    public get applyStateRange(): string {
      return this.getText(this._applyStateRange, 'Custom Apply');
    }

    private _cancelState = 0;
    public get cancelState(): string {
      return this.getText(this._cancelState, 'Custom Cancel');
    }

    private _cancelStateRange = 0;
    public get cancelStateRange(): string {
      return this.getText(this._cancelStateRange, 'Custom Cancel');
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

    public withApply(range?: 'range'): void {
      if (range) {
        this._applyStateRange++;
        this._applyStateRange = this._applyStateRange % 4;
        this.generateRangeConfig();
        return;
      }
      this._applyState++;
      this._applyState = this._applyState % 4;
      this.generateConfig();
    }

    public withCancel(range?: 'range'): void {
      if (range) {
        this._cancelStateRange++;
        this._cancelStateRange = this._cancelStateRange % 4;
        this.generateRangeConfig();
        return;
      }
      this._cancelState++;
      this._cancelState = this._cancelState % 4;
      this.generateConfig();
    }

    public get hasDateChanged(): boolean {
      return this.previousValue != this.bsValue;
    }

    public get hasDateRangeChanged(): boolean {
      return this.previousRangeValue != this.bsRangeValue;
    }
    private generateConfig(): void {
      this.config = {
        ...this.defaultConfig,
        showTodayButton: this._todayState > 0,
        todayPosition: this.states[this._todayState] as DatepickerButtonPosition,
        showClearButton: this._clearState > 0,
        clearPosition: this.states[this._clearState] as DatepickerButtonPosition,
        customButtons: this._applyState + this._cancelState > 0 ? [
          {
            label: 'Apply',
            btnClass: 'btn-primary',
		        containerClass: 'btn-default-wrapper',
            position: this.states[this._applyState] as DatepickerButtonPosition,
            action: (date) => this.applyDate(date)
          },
          {
            label: 'Cancel',
            btnClass: 'btn-secondary',
            position: this.states[this._cancelState] as DatepickerButtonPosition,
            action: (date) => this.cancelDate(date)
          },
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

    private generateRangeConfig(): void {
      this.rangeConfig = {
        ...this.defaultRangeConfig,
        showTodayButton: this._todayStateRange > 0,
        todayPosition: this.states[this._todayStateRange] as DatepickerButtonPosition,
        showClearButton: this._clearStateRange > 0,
        clearPosition: this.states[this._clearStateRange] as DatepickerButtonPosition,
        customButtons: this._applyStateRange + this._cancelStateRange > 0 ? [
          {
            label: 'Apply',
            btnClass: 'btn-primary',
		        containerClass: 'btn-default-wrapper',
            position: this.states[this._applyStateRange] as DatepickerButtonPosition,
            action: (date) => this.applyDateRange(date)
          },
          {
            label: 'Cancel',
            btnClass: 'btn-secondary',
            position: this.states[this._cancelStateRange] as DatepickerButtonPosition,
            action: (date) => this.cancelDateRange(date)
          },
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
