import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastService } from '../service/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  visibleUsers: any[] = [];
  itemsPerRow = 4;
  itemsPerPage = 8;
  currentPage = 0;
  showLoadMoreButton = true; // Variable to track whether to show the "Load More" button

  constructor(private router:Router,private toast: ToastService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.loadMore();
    });
  }

  loadMore() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const newUsers = this.users.slice(startIndex, endIndex);
    
    if (newUsers.length === 0) {
      // No more records to load, show a toast message
      this.toast.showToast('No more records to load.', 'Alert', 'warning');

      this.showLoadMoreButton = false; // Hide the "Load More" button
    } else {
      this.visibleUsers.push(...newUsers);
      this.currentPage++;
    }
  }


  setSelectedUserId(userid: any) {
    console.log("User id : ",userid)
    localStorage.setItem("selectedUser", userid);
    console.log(localStorage.getItem("selectedUser"))
    // window.location.href = '/users?id='+userid;

    this.router.navigate(['/users'], { queryParams: { id: userid } });
  }
  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(response => {
    });
  }
}
