import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaimList } from './claim-list';

describe('ClaimList', () => {
  let component: ClaimList;
  let fixture: ComponentFixture<ClaimList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimList],
    }).compileComponents();

    fixture = TestBed.createComponent(ClaimList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
