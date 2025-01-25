import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"
import { Link } from "react-router-dom"
import { useState } from "react"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [data, setData] = useState({
    navMain: [
      {
        title: "Operations",
        url: "/",
        items: [
          {
            title: "Profile",
            url: "/member",
            isActive: false
          },
          {
            title: "Recharge",
            url: "/recharge",
            isActive: false
          },
          {
            title: "Transactions",
            url: "/transactions",
            isActive: false
          },
          {
            title: "Notifications",
            url: "/notifications",
            isActive: false
          },
          {
            title: "Add Guests",
            url: "/addGuests",
            isActive: false
          },
          {
            title: "Book DSOI",
            url: "/book",
            isActive: false
          },
        ],
      }
    ],
  });

  function handleClick(idx: number) {
    setData(prevData => {
      const newData = { ...prevData };
      newData.navMain[0].items.forEach(e => {
        e.isActive = false;
      });
      newData.navMain[0].items[idx].isActive = true;
      return newData;
    });
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <span>Select Theme <ModeToggle /></span>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item, idx) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link to={item.url} onClick={() => handleClick(idx)}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
