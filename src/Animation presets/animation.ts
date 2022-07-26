export const variants = {
    hidden: {
        opacity: 0,
        x: -30,

    },
    visible: (custom: number) => ({
        opacity: 1,
        x: 0,
        transition: {delay: custom * 0.2, duration: 0.5},
    })
}