export type ReachResult = {
    public: boolean | null,
    private: boolean | null,
}

export type ReachExplanation = {
    global?: {
        type: 'success' | 'failure' | 'neutral',
        message: string,
    },
    reach: {
        type: 'success' | 'failure' | 'neutral',
        message: string,
    },
    dns: {
        type: 'success' | 'failure' | 'neutral',
        message: string,
    },
};

export function defaultExplanation(testDNS: boolean): ReachExplanation {
    return {
        reach: {
            type: 'neutral',
            message: 'Testing...',
        },
        dns: {
            type: 'neutral',
            message: testDNS ? 'Testing...' : 'Private URL not set, skipping DNS test',
        },
    }
}


async function isReachable(url: string | false, timeout: number) {
    if (!url) {
        return null;
    }

    const controller = new AbortController();
    const timeoutObj = setTimeout(() => controller.abort(), timeout);
    try {
        await fetch(url, { signal: controller.signal, mode: 'no-cors' })
        return true;
    }
    catch {
        controller.abort();
        return false;
    }
    finally {
        clearTimeout(timeoutObj);
    }
}

export default async function reachTest(timeout: number, publicURL: string | false, privateURL: string | false) {   
    return {
        public: await isReachable(publicURL, timeout),
        private: await isReachable(privateURL, timeout),
    }
}

export function explainResult(result: ReachResult | null, testDNS: boolean): ReachExplanation {
    if (!result) {
        return {
            reach: {
                type: 'neutral',
                message: 'Testing...',
            },
            dns: {
                type: 'neutral',
                message: testDNS ? 'Testing...' : 'Private URL not set, skipping DNS test',
            },
        }
    }

    if (result.public === null && result.private === null) {
        return {
            global: {
                type: 'failure',
                message: "Public and private URLs are not set, no tests were performed",
            },
            reach: {
                type: 'neutral',
                message: 'Not performed',
            },
            dns: {
                type: 'neutral',
                message: 'Not performed',
            },
        }
    }
    
    // This indicates that internal CA is used
    if (result.public === null) {
        return {
            reach: {
                type: 'neutral',
                message: 'Public URL not set, assuming Internal CA is used',
            },
            dns: {
                type: result.private ? "success" : 'failure',
                message: result.private ? "OK" : "Failed - Check network, DNS settings and check if internal CA is correctly installed",
            }
        }
    }

    if (result.private === null) {
        return {
            reach: {
                type: result.public ? "success" : 'failure',
                message: result.public ? "OK" : "Failed",
            },
            dns: {
                type: 'neutral',
                message: 'Private URL not set, skipping DNS test',
            }
        }
    }

    return {
        reach: {
            type: result.public ? "success" : 'failure',
            message: result.public ? "OK" : "Failed",
        },
        dns: {
            type: result.private ? "success" : 'failure',
            message: result.private ? "OK" : "Failed",
        }
    }

}