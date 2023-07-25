import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
const OptionBagde = () => {
  const [dialogOpen, setDialogOpen] = useState<false | true>(false);
 
  const handleOpen = () => setDialogOpen(true);
 
  return (
    <Fragment>
      <a className=" text-red-500" onClick={() => setDialogOpen(true)}>Delete Message</a>
      <Dialog open={dialogOpen} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody divider>
          The key to more success is to have a lot of pillows. Put it this way, it took me
              twenty five years to get these plants, twenty five years of blood sweat and tears, and
              I&apos;m never giving up, I&apos;m just getting started. I&apos;m up to something. Fan
              luv.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button  color="green" >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default OptionBagde;