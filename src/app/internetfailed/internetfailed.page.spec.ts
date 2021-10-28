import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InternetfailedPage } from './internetfailed.page';

describe('InternetfailedPage', () => {
  let component: InternetfailedPage;
  let fixture: ComponentFixture<InternetfailedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternetfailedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InternetfailedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
