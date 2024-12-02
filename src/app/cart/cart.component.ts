import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CartList } from '../Model/Cart.DataSource';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  totalPrice: number = 0;

  constructor(private dialog: MatDialog) {
    this.updateTotalPrice();
  }

  getCartList() {
    return CartList.filter((item) => item.Status === true);
  }

  getUserList() {
    // Simulated user list
    return [
      { FullName: 'John Doe' },
      { FullName: 'Jane Smith' },
      { FullName: 'Alex Johnson' },
    ];
  }

  updateTotalPrice() {
    this.totalPrice = this.getCartList().reduce(
      (sum, item) => sum + item.TotalPrice,
      0
    );
  }

  removeCart(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir retirer ce produit du panier?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        const index = CartList.findIndex((item) => item.Id === id);
        if (index !== -1) {
          CartList[index].Status = false;
          this.updateTotalPrice();
          console.log('Produit retiré du panier!');
        }
      } else {
        console.log('Retrait annulé.');
      }
    });
  }

  plusProduct(id: any) {
    const product = CartList.find((item) => item.Id === id);
    if (product && product.Quantity < product.Phone.Stock) {
      product.Quantity++;
      product.TotalPrice = product.Quantity * product.Phone.Price;
      this.updateTotalPrice();
    }
  }

  minusProduct(id: any) {
    const product = CartList.find((item) => item.Id === id);
    if (product && product.Quantity > 1) {
      product.Quantity--;
      product.TotalPrice = product.Quantity * product.Phone.Price;
      this.updateTotalPrice();
    }
  }

  confirmOrder(userName: string) {
    console.log(`Commande confirmée pour ${userName}`);
  }

  cancelOrder() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Annulation de commande',
        message: 'Êtes-vous sûr de vouloir annuler la commande?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        CartList.forEach((item) => (item.Status = false));
        this.updateTotalPrice();
        console.log('Commande annulée.');
      }
    });
  }
}
