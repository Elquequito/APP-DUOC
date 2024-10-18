import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileDocPage } from './profile-doc.page';

describe('ProfileDocPage', () => {
  let component: ProfileDocPage;
  let fixture: ComponentFixture<ProfileDocPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
