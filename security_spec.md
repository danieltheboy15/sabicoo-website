# Security Specification & Payload-First TDD (`security_spec.md`)

## 1. Data Invariants
1. **Insights (`/insights/{articleId}`)**:
   - Every article ID must match `^[a-zA-Z0-9_\-]+$` (2–128 chars).
   - Unauthenticated visitors and non-authors can ONLY read (`get`/`list`) documents where `status == 'published'`.
   - Drafts (`status == 'draft'`) can ONLY be read by their `authorUid` or an Admin.
   - Only verified Admins or approved `/authorized_authors/{uid}` can create, update, or delete insights.
   - `authorUid` and `createdAt` are immutable once created (`createdAt == request.time` on create; `updatedAt == request.time` on create/update).
   - All strings and arrays have strict `.size()` bounds; shadow keys are rejected via `hasAll` + `hasOnly`.
2. **Admins (`/admins/{uid}`)**:
   - Users can read only their own `/admins/{uid}` doc (`request.auth.uid == uid`) or Admins can read/list all.
   - Only bootstrapped/verified Admins can create, update, or delete `/admins/{uid}`. Users can never self-grant admin status.
3. **Authorized Authors (`/authorized_authors/{uid}`)**:
   - Contains PII (`email`). Read (`get`) is strictly restricted to `request.auth.uid == uid` or Admins. List is strictly restricted to Admins (using token-verified admin check, no `get()` in `allow list`).
   - Only Admins can create, update, or delete `/authorized_authors/{uid}`.
4. **Access Requests (`/access_requests/{uid}`)**:
   - Contains PII (`email`). A signed-in verified user can create or read ONLY their own `/access_requests/{uid}` with `status == 'pending'`.
   - Users cannot self-approve (`status` must remain `'pending'` on create, and only Admins can update `status` to `'approved'` or `'declined'`).

## 2. The "Dirty Dozen" Attack Payloads (All Must Return `PERMISSION_DENIED`)
1. Unauthenticated write to `/insights/hack-post` -> DENIED.
2. Signed-in user who is NOT in `/authorized_authors` and NOT Admin creates `/insights/unauth-post` -> DENIED.
3. Unverified email (`email_verified: false`) matching admin email attempts create/read -> DENIED.
4. Authorized author attempts to spoof `authorUid: "someone-else"` on `/insights` create -> DENIED.
5. Authorized author injects shadow field `isFeaturedSuperAdmin: true` on `/insights` create or update -> DENIED.
6. Authorized author attempts to mutate `createdAt` or `authorUid` on `/insights` update -> DENIED.
7. Unauthenticated visitor queries `/insights` for `status == 'draft'` -> DENIED.
8. Non-owner author attempts to overwrite or delete another author's `/insights/{id}` -> DENIED.
9. Oversized payload (`title` > 180 chars or `sections` > 15 items or invalid `articleId` with spaces/slashes) -> DENIED.
10. Regular user attempts to create `/admins/{myUid}` to escalate privileges -> DENIED.
11. Regular user attempts to create `/access_requests/{myUid}` with `status: 'approved'` (state shortcutting) -> DENIED.
12. Signed-in user attempts to `get` or `list` `/authorized_authors` or `/access_requests` belonging to other users (PII leak) -> DENIED.
