import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  isSlideOut = true;
  mobileQuery: MediaQueryList;

  fillerNav = [{name:'Dashboard',goto:'dashboard'},
  {name:'Profile',goto:'profile'},
  {name:'Prev History',goto:'prev-history'},
  {name:'Log Out',goto:'logout'},
  ];
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private router: Router) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleSlideOut(): void {
    this.isSlideOut = !this.isSlideOut;
  }
  // onDash() {
  //   this.router.navigate(['/dashboard']);
  // }
  // onProfile() {
  //   this.router.navigate(['/profile']);
  // }
  // onHistory() {
  //   this.router.navigate(['/prev-history']);
  // }
  // onLogout() {
  //   this.router.navigate(['/logout']);
  // }

  private _mobileQueryListener: () => void;


}

