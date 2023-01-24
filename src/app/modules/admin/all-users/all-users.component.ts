import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserDTO, UserService } from '../../security/user.service';
import { Blocking, BlockRemarksComponent } from '../block-remarks/block-remarks.component';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})

export class AllUsersComponent {
  displayedColumns: string[] = [ "role", "name", 'surname', 'email', 'address', 'telephoneNumber', 'blocked'];
  dataSource = new MatTableDataSource<UserDTO>;
  users: UserDTO[] = [];
  popup:boolean=false;
  @ViewChild(MatPaginator) paginator!: any;
  @ViewChild(BlockRemarksComponent) blockComponent:any;

  constructor(
    private _liveAnnouncer:LiveAnnouncer,
    private userService:UserService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users= res.results;
        this.dataSource = new MatTableDataSource<UserDTO>(this.users);
        this.dataSource.paginator = this.paginator;

      }}

    );

    
  }

  onCloseChild(blocking:Blocking){
    let userToUpdate = this.dataSource.data.find(x=> x.id===blocking.userId);
    if(userToUpdate!=undefined){
      userToUpdate.blocked = blocking.blocked;
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      this.dataSource.paginator = this.paginator;
    }

  }
  
  showPopup(user:UserDTO){
    this.popup = true;
    this.blockComponent.set(user);
  }




}
