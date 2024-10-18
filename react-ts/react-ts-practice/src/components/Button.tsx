import { ComponentPropsWithoutRef, ElementType } from "react";
import { Link } from "react-router-dom";

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    to?: never;
    textonly?: boolean;
  };

// typeof Link, alt use LinkProps
type LinkProps = ComponentPropsWithoutRef<typeof Link> & {
    to?: string;
    textonly?: boolean;
};

function isLinkProps(props: ButtonProps | LinkProps): props is LinkProps {
    return 'to' in props;
}

export default function Button(props: ButtonProps | LinkProps){
    //Check text only
    let classStyle = "button";
    if(props.textonly){
        classStyle = "button button--text-only";
    }

    if (isLinkProps(props)) {
        return <Link className={classStyle} {...props}></Link>;
    }
    
    return <button className={classStyle} {...props}></button>;
}