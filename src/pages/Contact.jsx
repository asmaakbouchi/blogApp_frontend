import { Alert, Button, Label, TextInput } from 'flowbite-react';

export default function contact() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='p-4 max-w-2xl mx-auto'>
        <form className='flex flex-col gap-4' >
          <div>
            <Label>First Name</Label>
            <TextInput type='text' placeholder='First Name' id='firstname' />
          </div>
          <div>
            <Label>Last Name</Label>
            <TextInput type='text' placeholder='Last Name' id='lastname' />
          </div>
          <div>
            <Label>Email</Label>
            <TextInput type='email' placeholder='Email' id='email' />
          </div>
          <div>
            <Label>Phone Number</Label>
            <TextInput type='number' placeholder='Phone Number' id='phone' />
          </div>
          <div>
            <Label>Message</Label>
            <TextInput type='text' placeholder='Message' id='message' />
          </div> 
          <Button gradientDuoTone='purpleToPink' type='submit'>
            Send Message
          </Button>
         
        </form>
      </div>
    </div>

  );
}
