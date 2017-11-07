function rayTriangleIntersect(s0, s1, triangle)
{
    var orig = new Vector(s0[0], s0[1], s0[2]);
    var dir = new Vector(s1[0], s1[1], s1[2]);
    var v0 = new Vector(triangle[0][0], triangle[0][1], triangle[0][2]);
    var v1 = new Vector(triangle[1][0], triangle[1][1], triangle[1][2]);
    var v2 = new Vector(triangle[2][0], triangle[2][1], triangle[2][2]);

    // compute plane's normal
    var v0v1 = v1.subtract(v0);
    var v0v2 = v2.subtract(v0);
    // no need to normalize
    var N = v0v1.cross(v0v2); // N

    // Step 1: finding P

    // check if ray and plane are parallel ?
    var NdotRayDirection = N.dot(dir);
    if (Math.abs(NdotRayDirection) < 0.0001) // almost 0
        return false; // they are parallel so they don't intersect !

    // compute d parameter using equation 2
    var d = N.dot(v0);

    // compute t (equation 3)
    var t = (N.dot(orig) + d) / NdotRayDirection;
    // check if the triangle is in behind the ray
    if (t < 0) return false; // the triangle is behind

    // compute the intersection point using equation 1
    var P = orig.add(dir.multiply(t));

    // Step 2: inside-outside test
    var C; // vector perpendicular to triangle's plane

    // edge 0
    var edge0 = v1.subtract(v0);
    var vp0 = P.subtract(v0);
    C = edge0.cross(vp0);
    if (N.dot(C) < 0) return false; // P is on the right side

    // edge 1
    var edge1 = v2.subtract(v1);
    var vp1 = P.subtract(v1);
    C = edge1.cross(vp1);
    if (N.dot(C) < 0)  return false; // P is on the right side

    // edge 2
    var edge2 = v0.subtract(v2);
    var vp2 = P.subtract(v2);
    C = edge2.cross(vp2);
    if (N.dot(C) < 0) return false; // P is on the right side;

    return true; // this ray hits the triangle
}