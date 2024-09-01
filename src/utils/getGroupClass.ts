export default function getGroupClass(group: string){
    switch (group) {
        case "General Education Group":
            return "bg-yellow-400 text-black";
        case "Free Electives":
            return "bg-red-500";
        default:
            return "";
    }
};