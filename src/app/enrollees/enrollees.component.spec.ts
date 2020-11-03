import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';

import { EnrolleesComponent } from './enrollees.component';
import { DataService } from '../data.service';
import { By } from '@angular/platform-browser';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Enrollee } from '../enrollee';
import { of } from 'rxjs';



describe('EnrolleesComponent', () => {
  let component: EnrolleesComponent;
  let fixture: ComponentFixture<EnrolleesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        NgxPaginationModule,
        Ng2OrderModule,
        FormsModule,
        MatIconModule,
        CommonModule
      ],
      declarations: [EnrolleesComponent],
      providers: [
        // DataService
        { provide: DataService, useClass: DataServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolleesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create enrollees component', () => {
    expect(component).toBeTruthy();
  });
  it('should contain select option for paginator', () => {
    fixture.detectChanges();
    const option = fixture.debugElement.queryAll(By.css('.top'));
    expect(option[0].nativeNode.childNodes[0].childNodes[1].localName).toBe('select');
  });

  it('should contain searchbox on the page', () => {
    fixture.detectChanges();
    const search = fixture.debugElement.queryAll(By.css('.top'));
    expect(search[0].nativeNode.childNodes[1].childNodes[0].localName).toBe('input');
  });
  it('should contain table on the page', () => {
    fixture.detectChanges();
    const showTable = fixture.debugElement.queryAll(By.css('.container'));
    expect(showTable[0].nativeNode.childNodes[0].localName).toBe('table');
  });
  it('should contain paginator on the page', () => {
    fixture.detectChanges();
    const showPaginator = fixture.debugElement.queryAll(By.css('.bottom'));
    expect(showPaginator[0].nativeNode.childNodes[0].childNodes[0].localName).toBe('pagination-controls');
  });
  it('should show header row with 5 headers in the table', () => {
    fixture.detectChanges();
    const showNoList = fixture.debugElement.queryAll(By.css('.allHeader'));
    expect(showNoList[0].nativeNode.childNodes.length).toBe(5);
  });
  it('should show no elements in the table if there is no data', () => {
    fixture.detectChanges();
    const showNoList = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(showNoList.length).toBe(0);
  });
  it('should show one data element When there is one data in the server', () => {
    fixture.detectChanges();

    component.enrollees = [
      {
        id: '36653835-fbe0-4c42-a93c-3e561823934f',
        name: 'Gabe Newell',
        dateOfBirth: '1962-11-3',
        active: true
      }];
    fixture.detectChanges();
    fixture.whenStable().then(() => fixture.detectChanges());
    const showTable = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(showTable.length).toBe(1);
  });
  it('should correctly render the passed @Input value on search', () => {
    fixture.detectChanges();
    const searchInput = fixture.debugElement.queryAll(By.css('input[type=text]'));
    const inputEl = searchInput[0].nativeElement;
    inputEl.value = 'Gabe';
    fixture.detectChanges();
    expect(searchInput[0].nativeElement.value).toBe('Gabe');
  });
});



// dataservice stub to test the table
class DataServiceStub {
  public sendGetRequest(): any {
    return of([]);
  }
  public updateEnrolleeenrollee(enrollee: Enrollee, id: string): any {
  }
}
