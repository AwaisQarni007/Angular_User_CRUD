import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastService } from '../service/toast.service';
import { Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {
  userId: any = localStorage.getItem('selectedUser');
  user: any = {
    name: '',
    email: '',
    profilePictureUrl: ''
  };

  constructor(private route: ActivatedRoute,private toast: ToastService, private userService: UserService, private renderer: Renderer2, private el: ElementRef, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params['id'];
    });
    this.userId = localStorage.getItem('selectedUser');
    console.log("User id : ", this.user);
    // Fetch user data by ID when the component initializes
    this.userService.getUserById(this.userId).subscribe(user => {
      this.user = user[0];
      console.log("Edit Modal : ", this.user[0])
    });
  }

  updateUser() {

    this.userService.updateUser(this.user).subscribe(
      (response: any) => {
        this.toast.showToast('User updated successfully!', 'Success', 'success');
        this.closeModal();
      },
      (error: any) => {
        this.toast.showToast('Failed to update user. Please try again.', 'Alert', 'warning');
      }
    );
  }
  closeModal() {
    setTimeout(() => {
      const modalElement = this.el.nativeElement.querySelector('#editUserModal');
      this.renderer.removeClass(modalElement, 'show');
      this.renderer.setStyle(modalElement, 'display', 'none');
      this.renderer.removeClass(document.body, 'modal-open');
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }, 500);
    window.location.href = '/users';
  }
}
