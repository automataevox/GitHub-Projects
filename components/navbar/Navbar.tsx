"use client";

import NextLink from "next/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import { projects } from "@/data/projects";

export const Navbar = () => {
  // Show only projects with inNav: true in navbar
  const navbarProjects = projects.filter(
    (p) => p.inNav === true
  );

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      className="bg-black/40 backdrop-blur-md border-b border-white/10"
    >
      {/* BRAND */}
      <NavbarBrand>
        <NextLink href="/" className="font-bold text-lg tracking-tight">
          Orixa
        </NextLink>
      </NavbarBrand>

      {/* DESKTOP NAV */}
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {/* PROJECTS DROPDOWN */}
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <NextLink href={"#"} className="text-sm font-medium text-foreground/80 hover:text-foreground">
                Projects
              </NextLink>
            </DropdownTrigger>
          </NavbarItem>

          <DropdownMenu
            aria-label="Projects"
            items={[
              ...navbarProjects.map((project) => ({
                key: project.id,
                name: project.name,
                description: project.shortDescription,
                path: project.path,
                isAll: false,
              })),
              {
                key: "all",
                name: "View all projects →",
                path: "/",
                isAll: true,
                description: undefined,
              },
            ]}
          >
            {(item: { key: string; name: string; path: string; description?: string; isAll?: boolean }) => (
              <DropdownItem
                key={item.key}
                className={item.isAll ? "text-primary" : ""}
              >
                <NextLink href={item.path}>
                  {item.description ? (
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className="text-xs text-foreground/60">
                        {item.description}
                      </span>
                    </div>
                  ) : (
                    item.name
                  )}
                </NextLink>
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>

        {/* DOCS */}
        <NavbarItem>
          <NextLink
            href="/docs"
            className="text-sm font-medium text-foreground/80 hover:text-foreground"
          >
            Docs
          </NextLink>
        </NavbarItem>

        {/* ECOSYSTEM */}
        <NavbarItem>
          <NextLink
            href="/ecosystem"
            className="text-sm font-medium text-foreground/80 hover:text-foreground"
          >
            Ecosystem
          </NextLink>
        </NavbarItem>
      </NavbarContent>

      {/* RIGHT ACTIONS */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as="a"
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            isIconOnly
            variant="light"
            aria-label="GitHub"
          >
            {/* <Github size={18} /> */}
          </Button>
        </NavbarItem>

        <NavbarMenuToggle className="sm:hidden" />
      </NavbarContent>

      {/* MOBILE MENU */}
      <NavbarMenu>
        <NavbarMenuItem>
          <NextLink href="/">Home</NextLink>
        </NavbarMenuItem>

        {navbarProjects.map((project) => (
          <NavbarMenuItem key={project.id}>
            <NextLink href={project.path}>
              {project.name}
            </NextLink>
          </NavbarMenuItem>
        ))}

        <NavbarMenuItem>
          <NextLink href="/docs">Docs</NextLink>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <NextLink href="/ecosystem">Ecosystem</NextLink>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroUINavbar >
  );
};
