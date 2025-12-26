"use client";

import {
  IconAlertCircle,
  IconBrain,
  IconChartBar,
  IconDashboard,
  IconHelp,
  IconHelpCircle,
  IconInnerShadowTop,
  IconLayout,
  IconListDetails,
  IconNetwork,
  IconSearch,
  IconSettings,
  IconSparkles,
  IconTypography,
} from "@tabler/icons-react";
import type * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconSparkles,
    },
    {
      title: "Trending Now",
      url: "/dashboard/trending-now",
      icon: IconBrain,
    },
    {
      title: "Top Predictors",
      url: "/dashboard/top-predictors",
      icon: IconNetwork,
    },

    {
      title: "Gallery",
      url: "/dashboard/gallery",
      icon: IconListDetails,
    },
    {
      title: "My Predictions",
      url: "/my-predictions",
      icon: IconChartBar,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: IconTypography,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/dashboard/get-help",
      icon: IconHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/dashboard">
                <IconInnerShadowTop className="size-5!" />
                <span className="font-semibold text-base">Musarty</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary className="mt-auto" items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
