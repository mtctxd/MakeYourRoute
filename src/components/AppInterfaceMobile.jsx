import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';

const AppInterfaceMobile = ({ children, isOpen, onClose, btnRef }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>MakeYourRout</DrawerHeader>

        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AppInterfaceMobile;
