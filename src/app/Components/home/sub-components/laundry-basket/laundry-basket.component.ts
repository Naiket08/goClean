import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IntrojsService } from 'src/app/introjs.service';
import { GlobalStateInterface } from 'src/app/models/globalState.interface';
import { userDetails } from 'src/app/models/userInfo.model';

@Component({
  selector: 'app-laundry-basket',
  templateUrl: './laundry-basket.component.html',
  styleUrls: ['./laundry-basket.component.scss']
})
export class LaundryBasketComponent implements OnInit {
  @Input() public userInfo: userDetails | null | undefined; // decorate the property with @Input()

  constructor(public introJs: IntrojsService, private store: Store<GlobalStateInterface>) {
  }

  ngOnInit(): void {
    // this.introJs.featureOne();
  }

  ngOnChanges(change: SimpleChanges): void {
  }


  flipStatus = false; //this flag used to flip the laundry card to detergent 


  onClickChangeToDetergent() {

    this.flipStatus = !this.flipStatus;

  }



  public color: any = {

    twenty: "#0cf500",
    fourty: "#c8f500",
    sixty: "#f79a16",
    eighty: "#f56016",
    hundred: "#f51616"

  };

  public laundeyStatus = 60;



  public a20 = {
    height: '20%',
    background: '#0cf500'
  }

  public a40 = {
    height: '40%',
    background: '#bbfa32'
  }

  public a60 = {
    height: '60%',
    background: '#f79a16'
  }

  public a80 = {
    height: '80%',
    background: '#f56016'
  }

  public a100 = {
    height: '100%',
    background: '#f51616'
  }

  public a0 = {
    height: '0%',
    background: '#f51616'
  }

  public statusText = "Laundry Basket is empty";



  public onPercentageChangeColor(): any {

    switch (this.laundeyStatus) {
      case 20:
        this.statusText = "Laundry Basket is just 20% keep going";
        return (this.a20);

      case 40:
        this.statusText = "Laundry Basket is just 40% keep going";
        return (this.a40);
      case 60:
        this.statusText = "Laundry Basket is just 60% keep going";
        return (this.a60);

      case 80:
        this.statusText = "Laundry Basket is almost full. Please do laundry";
        return (this.a80);

      case 100:
        this.statusText = "Laundry Basket is full. You are good to go complete your laundry";
        return (this.a100);

      default:
        this.statusText = "Laundry Basket is empty";
        return (this.a0);

    }

  }

}
