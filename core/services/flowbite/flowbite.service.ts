// src/app/services/flowbite.service.ts
import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FlowbiteService {
  //constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  private readonly platformId = inject(PLATFORM_ID);

  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite').then(flowbite => {
        callback(flowbite);
      });
    }
  }
}
