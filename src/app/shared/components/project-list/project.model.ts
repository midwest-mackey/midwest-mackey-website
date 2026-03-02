import { Icon, IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Project {
    id: string;
    name: string;
    icon: Icon | IconDefinition;
    images: string;
}