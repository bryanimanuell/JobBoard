import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
    globalIgnores([
        "src/types/supabase.ts"
    ])
])