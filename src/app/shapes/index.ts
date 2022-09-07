import { shapes } from "@clientio/rappid";
import { AutoScaling } from "./autoScaling";
import { ECSCluster } from "./ecsCluster";
import { ECSService } from "./ecsService";
import { VPC } from "./vpc";
import { Subnet } from "./subnet";
import { SecurityGroup } from "./securityGroup";
import { NodeShape } from "./nodeShape";
import { CustomLink } from "./customLink";

Object.assign(shapes, {
    app: {
        AutoScaling,
        ECSCluster,
        ECSService,
        VPC,
        NodeShape,
        Subnet,
        SecurityGroup,
        CustomLink
    }
});

export {
    AutoScaling,
    ECSCluster,
    ECSService,
    VPC,
    NodeShape,
    Subnet,
    SecurityGroup,
    CustomLink
}