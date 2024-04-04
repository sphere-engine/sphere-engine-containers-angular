import { AfterViewInit, Component, ElementRef } from '@angular/core';

declare global {
  interface Window {
    SE?: any;
  }
}

@Component({
  selector: 'lib-workspace-se',
  templateUrl: './workspace-se.component.html',
  styleUrls: ['./workspace-se.component.scss'],
})
export class WorkspaceSeComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.text = `(function(d, s, id){
      SE_BASE = "fe530c0e.containers.sphere-engine.com";
      SE_HTTPS = true;
      SE = window.SE || (window.SE = []);
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = (SE_HTTPS ? "https" : "http") + "://" + SE_BASE + "/static/sdk/sdk.min.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, "script", "sphere-engine-jssdk"));
    
    SE.ready = function(f) {
      if (document.readyState != "loading" && document.readyState != "interactive") f();
      else window.addEventListener("load", f);
    };`;
    this.elementRef.nativeElement.appendChild(s);
  }

  protected workspaceId: string = '';
  protected loaded: boolean = false;
  protected workspace: any;
  public load(): void {
    this.loaded = true;
    setTimeout(() => {
      this.workspace = window.SE.workspace(this.workspaceId);
    }, 1000);
  }
}
