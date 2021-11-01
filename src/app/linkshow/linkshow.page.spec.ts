import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LinkshowPage } from './linkshow.page';

describe('LinkshowPage', () => {
  let component: LinkshowPage;
  let fixture: ComponentFixture<LinkshowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkshowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkshowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
