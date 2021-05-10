export const baseConfig = {
    headers: {
        "Content-Type": "application/json"
    }
};

export const authConfig = (token: string | null) => {
    if(!token) return baseConfig;
    return {
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    };
};
