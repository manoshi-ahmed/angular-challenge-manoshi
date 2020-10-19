import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

import { DataService } from './data.service';
import { Enrollee } from './enrollee';

describe('DataService', () => {
  let service: DataService,
  httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
        providers: [DataService]
    });

    service = TestBed.inject(DataService);
  });
  beforeEach(()=>{
    service=TestBed.get(DataService);
    httpTestingController=TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });
  it('should test DataService.sendGetRequest',()=>{
      const testdata: Enrollee[]= [
        {id:'36653835-fbe0-4c42-a93c-3e561823934f',
          active: true,
          name: 'Gabe Newell',
          dateOfBirth: '1962-11-3',
        },
        { id:'ed9f9e35-9767-4586-a19b-903661aa859d',
          active: true,
          name: 'Todd Howard',
          dateOfBirth: '1971-04-25',
        }
      ];
      service.sendGetRequest().subscribe((data: any[])=>{
        expect(testdata).toBe(data,'should check mocked data');  
      });
      const req = httpTestingController.expectOne(service.REST_API_SERVER);

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');

      req.flush(testdata);
      httpTestingController.verify();

  });
});
