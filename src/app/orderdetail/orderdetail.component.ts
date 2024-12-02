import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { OrderList } from '../Model/Order.DataSource';
import { User } from '../Model/User';
import { Cart } from '../Model/Cart';
import { UserService } from '../user.service';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {
  @Input() user: User | undefined;

  userList: User[] | undefined;
  carList: Cart[] | undefined;
  index: any;

  constructor(
    private userservices: UserService,
    private userService: UserService,
    private route: ActivatedRoute,
    private productService: UserService,
    private dialog: MatDialog // Injecting MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.servistenGelenUrunler();
    console.log(OrderList.filter((x) => x.User?.Id == this.user?.Id));
  }

  servistenGelenUrunler(): void {
    this.userService.getUserList().subscribe((phone) => {
      this.userList = phone;
    });
  }

  getUser() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getSinglePhone(Number(id)).subscribe((urun) => (this.user = urun));
  }

  getOrders() {
    return OrderList.filter((x) => x.User?.Id == this.user?.Id);
  }

  getCarts(id: any) {
    return OrderList.filter((x) => x.User?.Id == this.user?.Id)[id].CartList;
  }

  cancelOrder(id: any) {
    this.index = OrderList.findIndex((x) => x.Id == id);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Êtes-vous sûr de vouloir annuler cette commande ?',
        message: 'Cette action ne peut pas être annulée.'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        // Cancel the order
        OrderList[this.index].CartList.forEach((item) => {
          item.Phone.Stock += item.Quantity;
        });
        OrderList.splice(this.index, 1);

        // Success dialog
        this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: 'Succès',
            message: 'La commande a été annulée !'
          }
        });
      } else {
        // No action dialog
        this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: 'Aucune action effectuée',
            message: 'La commande n\'a pas été annulée.'
          }
        });
      }
    });
  }
}
