#!/usr/bin/env node
import { main } from './lib';

try {
    main();
} catch (err) {
    console.error(err);
    process.exit(1);
}
