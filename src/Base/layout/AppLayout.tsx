import { PropsWithChildren } from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";

import {
  BriefcaseIcon,
  HomeIcon,
  CubeIcon,
  ArchiveBoxIcon,
  ClipboardDocumentListIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

import { SidebarProvider } from "Base/contexts/SidebarContext";
import { DrawerProvider } from "Base/contexts/DrawerContext";
import { Drawer, Header, Sidebar, Footer } from "Base/components";
import { useTranslation } from "Base/i18n";

const HEADER_HEIGHT = "70px";

const AppLayout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation("appLayout");

  const sidebarMenu = [
    {
      title: t("sidebar.menu.home"),
      path: "/",
      icon: HomeIcon,
    },
    {
      title: t("sidebar.menu.product"),
      path: "/product",
      icon: CubeIcon,
    },
    {
      title: t("Categorias"),
      path: "/category",
      icon: ArchiveBoxIcon,
    },
    {
      title: t("sidebar.menu.movements"),
      path: "/movements",
      icon: ClipboardDocumentListIcon,
    },
    {
      title: t("Configuracion"),
      path: "/stockparameters",
      icon: CogIcon,
    },
    {
      title: t("sidebar.menu.warehouse"),
      path: "/warehouse",
      icon: BriefcaseIcon,
    },
  ];

  return (
    <DrawerProvider>
      <SidebarProvider>
        <Drawer menu={sidebarMenu} />
        <Flex>
          <Sidebar
            colorScheme="main"
            display={{ base: "none", md: "block" }}
            menu={sidebarMenu}
          />
          <Stack spacing={0} w="full">
            <Header menu={[]} username="" />
            <Box minH={`calc(100vh - ${HEADER_HEIGHT})`} pt={4}>
              {children}
            </Box>
            <Footer />
          </Stack>
        </Flex>
      </SidebarProvider>
    </DrawerProvider>
  );
};

export default AppLayout;
