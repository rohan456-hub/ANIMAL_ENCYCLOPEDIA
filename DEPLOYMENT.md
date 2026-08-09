# Deployment guide

## Services

Deploy the current four applications separately:

| Service | Provider | Root directory | Command |
| --- | --- | --- | --- |
| Public frontend | Vercel | `my-app` | `npm run build` |
| Admin frontend | Vercel | `admin` | `npm run build` |
| Public API | Render or Railway | `Server` | `npm start` |
| Admin API | Render or Railway | `adminserver` | `npm start` |

## Atlas migration

1. Create an Atlas cluster, database user, and network access rule.
2. Back up the local database without modifying it:

   ```powershell
   mongodump --uri="mongodb://localhost:27017/Animaldb" --out="./mongo-backup"
   ```

3. Restore the copy to Atlas. Do not use `--drop`:

   ```powershell
   mongorestore --uri="<your-Atlas-MONGODB_URI>" "./mongo-backup/Animaldb"
   ```

4. Compare collection and document counts in Compass before changing the deployed `MONGODB_URI`.

## Environment variables

Set `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URLS` in both API services. Set `ADMIN_EMAILS` in the admin API service. Cloud platforms supply `PORT`; do not set a fixed production port.

Set these in Vercel before building:

- Public app: `REACT_APP_PUBLIC_API_URL=https://<public-api-domain>`
- Admin app: `REACT_APP_ADMIN_API_URL=https://<admin-api-domain>` and `REACT_APP_PUBLIC_API_URL=https://<public-api-domain>`

After Vercel provides the final frontend domains, update `CLIENT_URLS` with their exact HTTPS origins and redeploy the APIs.

## Uploaded media

`Server/uploads` remains on your machine and is intentionally ignored. Render/Railway disks are not permanent, so migrate existing and new image/audio/video files to object storage such as Cloudinary, S3, or R2 before relying on uploads in production. Do not delete local media until the migrated copy is verified.