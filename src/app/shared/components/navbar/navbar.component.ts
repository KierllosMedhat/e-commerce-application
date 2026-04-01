import { Component, inject, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite/lib/esm/components';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly flowbiteService = inject(FlowbiteService);

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
