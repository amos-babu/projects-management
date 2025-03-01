export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src={`${
                import.meta.env.BASE_URL
            }favicon/android-chrome-192x192.png`}
            alt="Logo"
            className={`${props.size}`}
        />
    );
}
