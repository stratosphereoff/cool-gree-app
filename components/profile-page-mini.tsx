import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import UserAvatar from "./user-avatar";

interface ProfilePageMiniProps {
    imageUrl?: string;
}

const ProfilePageMini = ({
    imageUrl
}: ProfilePageMiniProps) => {
    return ( 
        <Popover>
          <PopoverTrigger>
            <UserAvatar 
              src={imageUrl}
              className="h-8 w-8 md:h-8 md:w-8 mr-2"
            />
          </PopoverTrigger>
          <PopoverContent className="flex flex-row justify-center items-center">
            <div> 
                TODO
            </div>
          </PopoverContent>
        </Popover>
     );
}
 
export default ProfilePageMini;