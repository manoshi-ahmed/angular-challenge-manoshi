import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';

import { EnrolleesComponent } from './enrollees.component';
import { DataService } from '../data.service';
import { By } from '@angular/platform-browser'
import { Ng2OrderModule } from 'ng2-order-pipe';



describe('EnrolleesComponent', () => {
  let component: EnrolleesComponent;
  let fixture: ComponentFixture<EnrolleesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,  
        MatSnackBarModule, 
        NgxPaginationModule,
        Ng2OrderModule
      ],
      declarations: [ EnrolleesComponent ],
      providers: [ DataService
        //{provide: DataService, useClass: DataServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolleesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain at least one select option on the page',() => {
    const fixture = TestBed.createComponent(EnrolleesComponent);
      const optionSize= fixture.debugElement.queryAll(By.css('select'));
      expect(optionSize.length >=1).toBeTruthy();
  });
  it('should contain one search box', () => {
    const fixture = TestBed.createComponent(EnrolleesComponent);
    fixture.detectChanges();
    const inEl = fixture.debugElement.query(By.css('#searchInput'));
    expect(inEl.nativeElement.className).toBe("search");
  });
  it('should contain one table on the page',() => {
    const fixture = TestBed.createComponent(EnrolleesComponent);
      const optionSize= fixture.debugElement.queryAll(By.css('table'));
      expect(optionSize.length).toBe(1);
  });

 
});
// class DataServiceStub{

// }
